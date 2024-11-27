class AddAiFeedbackColumnToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :ai_feedback, :text
  end
end
