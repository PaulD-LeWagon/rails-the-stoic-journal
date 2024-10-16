class JournalCategory < ApplicationRecord
  belongs_to :journal_entry
  belongs_to :category
end
