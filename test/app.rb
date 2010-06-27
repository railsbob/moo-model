require 'rubygems'
require 'sinatra'
require 'json'

get '/' do
  redirect '/index.html'
end

post '/posts' do
  JSON.generate({ :id => 1 })
end
