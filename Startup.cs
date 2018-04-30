using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WeddingApp.Models;

namespace WeddingApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Environment.GetEnvironmentVariable("ConnectionStrings:WeddingDBConnectionString", EnvironmentVariableTarget.Process);

            if (string.IsNullOrEmpty(connection))
            {
                //Environment is not local
                connection = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_WeddingDBConnectionString", EnvironmentVariableTarget.Process);
            }

            //connection = Configuration["ConnectionStrings:WeddingDBConnectionString"];

            services.AddDbContext<RsvpContext>(options => options.UseSqlServer(connection));
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
            });
        }
        

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, RsvpContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            context.Database.Migrate();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
