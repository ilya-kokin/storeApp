Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static#angular'

  get '/cart', to: 'static#angular'
  get '/orders', to: 'static#angular'
  get '/api/products', to: 'products#index'
  get '/api/orders', to: 'orders#index'
  post '/api/orders', to: 'orders#create'

end
