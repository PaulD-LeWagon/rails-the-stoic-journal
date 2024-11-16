class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true

      t.integer :routine, null: false, default: 0
      t.json :recurs_on, null: false, default: {
                    monday: "0",
                    tuesday: "0",
                    wednesday: "0",
                    thursday: "0",
                    friday: "0",
                    saturday: "0",
                    sunday: "0",
                  }
      t.boolean :active, null: false, default: true
      t.integer :task_type, null: false, default: 0

      t.integer :order, null: false, default: 0
      t.string :title, null: false, default: ""
      t.text :description, null: false, default: ""
      t.text :comment, null: false, default: ""
      t.datetime :start_date
      t.datetime :due_date
      t.boolean :completed, null: false, default: false

      t.timestamps
    end
  end
end
