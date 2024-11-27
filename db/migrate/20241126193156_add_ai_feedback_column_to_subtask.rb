class AddAiFeedbackColumnToSubtask < ActiveRecord::Migration[7.1]
  def change
    add_column :subtasks, :ai_feedback, :text
  end
end
