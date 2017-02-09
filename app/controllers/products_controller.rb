class ProductsController < ApplicationController
	def index
		@products = Product.order(:id).all
		render :json => @products
	end
end
