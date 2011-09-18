require 'rubygems'
require 'sinatra' 
require 'haml'
require 'haml/helpers'
 
 
set :public, Proc.new { File.join(root, "_site") }
 
get '/' do
  File.read('_site/index.html') 
end

 
helpers do 	
	def request_info
	    "#{ request.request_method.upcase } #{ request.path_info } #{ params.inspect }"   
	end 	
end 