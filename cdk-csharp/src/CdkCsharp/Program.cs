using Amazon.CDK;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CdkCsharp
{
    sealed class Program
    {
        public static void Main(string[] args)
        {
            var app = new App();
            new CdkCsharpStack(app, "CdkCsharpStack");
            app.Synth();
        }
    }
}
