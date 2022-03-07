class User < ApplicationRecord
    has_secure_password

    has_many :user_items
    has_many :items, through: :user_items
end
