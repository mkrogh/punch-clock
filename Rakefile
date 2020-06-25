
require "rake"

task :s => :server

task :server do
  system "server.sh"
end

task :dist => ["distribute:all"]  do 
  
end

namespace :distribute do
  dist_dir = "dist"

  task :all => [:build_js, :create_html, :copy_resources]

  task :clean  do
    puts "Removing dist dir"
    FileUtils.rm_r dist_dir
  end

  task :build_js do 
    puts "Building js"
    `r.js -o build.js  out=#{dist_dir}/punch-clock.js`
  end

  task :copy_resources do
    FileUtils.cp_r "resources", dist_dir
  end

  task :create_html do 
    index_html = open("index.html").read.gsub(/js\/require.js/,"punch-clock.js")
    open(File.join(dist_dir,"/index.html"), "w") {|file| file.write(index_html)}
  end
end
