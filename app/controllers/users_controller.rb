class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
        users = User.all
        render json: users, status: 200, each_serializer: UserDetailSerializer
    end

    def show
        user = User.find session[:user_id]
        # byebug
        # user = User.find user_id
        render json: user, status: 200, serializer: UserDetailSerializer
    end

    private

    def record_not_found
        render json: {name: "Unauthorized"}, status: 404
    end
end
