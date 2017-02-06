class OrdersController < ApplicationController
	def index
		@orders = Order.all
		render :json => @orders
	end

	def create
		@order = Order.new(order_params)
		if @order.save
			render :json => { result: true }
		else
			render :json => { error: true }
		end
	end

	private

	def order_params
		# params.require(:order).permit!
		params.require(:order).permit(:customer_name, :customer_phone, :order => [:id, :name, :quantity, :price])
	end

end
