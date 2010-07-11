require 'rubygems'
require 'sinatra'
require 'json'

get '/' do
  redirect '/index.html'
end

post '/people' do
  JSON.generate({ :id => 1 })
end

delete '/posts/:id' do
  true
end

delete '/people/:id' do
  true
end

