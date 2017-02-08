class OrdersController < ApplicationController
	def index
		@orders = Order.all
		render :json => @orders
	end

	def create
		@order = Order.new(order_params)
		if @order.save
			order_params['order'].each do |product|
				Product.find(product['id']).decrement(:quantity, product['quantity']).save
			end
			render :json => { result: true }
		else
			render :json => { error: true }
		end
	end

	private

	def order_params
		params.require(:order).permit(:customer_name, :customer_phone, :created_at, :updated_at, :order => [:id, :name, :quantity, :price])
	end
	
end
