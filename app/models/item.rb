class Item < ApplicationRecord
    has_many :user_items
    has_many :users, through: :user_items
    validates :name, presence: true
    validates :original_cost, presence: true
end
