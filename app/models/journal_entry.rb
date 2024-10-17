class JournalEntry < ApplicationRecord
  belongs_to :user
  has_many :categories, through: :journal_categories
end
