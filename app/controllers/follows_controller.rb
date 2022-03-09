class FollowsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    
    def index
        user_id = params[:user_id]
        # find all follow records where user_id is user_id
        follows = Follow.where user_id: user_id
        followed_ids = follows.pluck :followed_id

        following = User.where id: followed_ids

        # find all user records where user_id is in the followed_id from last one
        render json: following, status: 200, each_serializer: UserDetailSerializer
    end

    def create
        follow = Follow.create! follow_params
        render json: follow, status: 201
    end

    def destroy
        unfollowed_id = params[:id]
        user_id = params[:user_id]
        follow = Follow.find_by user_id: user_id, followed_id: unfollowed_id
        follow.destroy!
        head :no_content
    end

    private

    def follow_params
        params.permit :user_id, :followed_id
    end

    def record_invalid invalid
        render json: {errors: invalid.record.errors.to_a}, status: 422
    end
end
