class UserDetailSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :user_items
end
