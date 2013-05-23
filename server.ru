use Rack::ETag

root=Dir.pwd
puts "$> Serving static files from #{root}"
run Rack::Directory.new root

