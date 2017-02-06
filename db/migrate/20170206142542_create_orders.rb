class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :customer_name
      t.string :customer_phone
      t.text :order

      t.timestamps
    end
  end
end
