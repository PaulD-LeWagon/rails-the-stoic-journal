class Category < ApplicationRecord
  belongs_to :journal_category, dependent: :destroy
  has_many :journal_entries, through: :journal_category
end
