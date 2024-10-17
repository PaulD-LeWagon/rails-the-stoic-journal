class Category < ApplicationRecord
  has_many :journal_categories
  has_many :journal_entries, through: :journal_categories

  validates :category, presence: true, length: { minimum: 2 }
  validates :category, uniqueness: true
end
