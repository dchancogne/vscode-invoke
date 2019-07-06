from invoke import task

@task
def build(ctx, docs=False):
   """Build task with a very long description of what the task does when called"""
   ctx.run("echo Build!")

@task
def deploy(ctx, docs=False):
   """Deploy task"""
   ctx.run("echo Clean!")

@task
def clean(ctx, docs=False):
   """Clean task with a very long description of what the task does when called"""
   ctx.run("echo Clean!")