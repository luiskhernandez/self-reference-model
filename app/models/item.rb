class Item < ActiveRecord::Base
  belongs_to :parent, class_name: 'Item'
  has_many :children, class_name: 'Item', foreign_key: 'parent_id'

  accepts_nested_attributes_for :children, reject_if: :all_blank, allow_destroy: true

  validates :definition, presence: true

  def truths
    children.where(truthy: true)
  end

  def falsey
    children.where(truthy: false)
  end
end
