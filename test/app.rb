require 'rubygems'
require 'sinatra'
require 'json'

get '/' do
  redirect '/index.html'
end

# Successful
post '/people' do
  JSON.generate({ :id => 101, :name => 'moonshine' })
end

put '/people/:id' do
  JSON.generate({ :id => 99, :name => 'sunshine' })
end

delete '/people/:id' do
  true
end

# Response with 500 errors

post '/people_failure' do
  status 500
end

put '/people_failure/:id' do
  status 500
end

# Response with validation errors

post '/people_validations' do
  status 422
end

put '/people_validations/:id' do
  status 422
end
