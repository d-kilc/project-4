class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

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

    def create
        user = User.create! username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation]
        session[:user_id] ||= user.id
        render json: user, status: 200, serializer: UserDetailSerializer
    end

    private

    def record_not_found
        render json: {name: "Unauthorized"}, status: 404
    end

    def record_invalid invalid
        render json: {errors: invalid.record.errors.to_a}, status: 422
    end
end
