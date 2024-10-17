class JournalCategory < ApplicationRecord
  belongs_to :journal_entry
  belongs_to :category

  validates :category, uniqueness: { scope: [:journal_entry_id] }
end
