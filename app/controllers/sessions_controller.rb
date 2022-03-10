class SessionsController < ApplicationController
    # skip_before_action :verify_authenticity_token
    # before_action :authorize_user
    
    def create
        user = User.find_by username: params[:username]
        
        if user&.authenticate params[:password]
            session[:user_id] ||= user.id
            # byebug
            render json: user, status: 200, serializer: UserDetailSerializer
        else
            # byebug
            render json: { error: "Invalid credentials.", name: 'Unauthorized' }, status: 401
        end
    end

    def destroy
        session.delete :user_id
        render json: {name: 'Unauthorized'}, status: 200
    end

end
