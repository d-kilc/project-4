class Follow < ApplicationRecord
    belongs_to :user, foreign_key: 'user_id'
    belongs_to :user, foreign_key: 'followed_id'
end
