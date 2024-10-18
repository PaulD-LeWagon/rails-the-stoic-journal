class JournalEntry < ApplicationRecord
  belongs_to :user
  has_many :journal_categories
  has_many :categories, through: :journal_categories

  validates :title, :entry, length: { minimum: 2 }
end
