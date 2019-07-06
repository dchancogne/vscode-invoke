"""Module creates a task to echo 'Hello World'"""
from invoke import task


@task
def world(c):
    """Echo Hello World"""
    c.run("echo Hello World")
