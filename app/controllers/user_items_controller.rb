class UserItemsController < ApplicationController
skip_before_action :verify_authenticity_token
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    
    def index
        user_items = UserItem.all
        render json: user_items, status: 200
    end

    def create
        user_item = UserItem.create! user_item_params
        render json: user_item, status: 201
    end

    def show
        user_item_id = params[:id]
        user_item = UserItem.find user_item_id
        render json: user_item, status: 200
    end

    def update
        user_item_id = params[:id]
        user_item = UserItem.find user_item_id
        user_item.update! user_item_params
        render json: user_item, status: 201
    end

    def destroy
        user_item_id = params[:id]
        user_item = UserItem.find user_item_id
        user_item.destroy!
        head :no_content
    end

    private

    def record_not_found
        render json: { error: "data not found" }, status: 404
    end

    def invalid_record invalid
        render json: { errors: invalid.record.errors.to_a }, status: 422
    end

    def user_item_params
        params.permit :notes, :item_type, :usage_time, :usage_frequency, :user_id, :item_id
    end
end
