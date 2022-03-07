class Item < ApplicationRecord
    has_many :user_items
    has_many :users, through: :user_items
    validates :name, presence: true, length: { minimum: 5 }
    validates :original_cost, presence: true
end
