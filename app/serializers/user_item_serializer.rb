class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :item_type, :usage_frequency, :usage_time, :item
end