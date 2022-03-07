class ItemsController < ApplicationController
skip_before_action :verify_authenticity_token
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        items = Item.all
        render json: items, status: 200
    end

    def show
        item_id = params[:id]
        item = Item.find item_id
        render json: item, status: 200
    end

    def create
        item = Item.create! item_params
        render json: item, status: 201
    end

    def update
        item_id = params[:id]
        item = Item.find item_id
        item.update! item_params
        render json: item, status: 200
    end

    def destroy
        item_id = params[:id]
        item = Item.find item_id
        item.destroy!
        head :no_content
    end

    private

    def item_params
        params.permit :name, :original_cost, :brand, :year_manufactured, :image_url, :description
    end

    def record_not_found
        render json: { error: "data not found" }, status: 404
    end

    def invalid_record invalid
        render json: { errors: invalid.record.errors.to_a }, status: 422
    end

end
