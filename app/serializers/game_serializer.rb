class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :private, :created_at, :updated_at

  belongs_to :white
  belongs_to :black
end
