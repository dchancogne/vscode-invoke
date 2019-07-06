"""Module creates a task to echo 'World Hello'"""
from invoke import task


@task
def hello(c):
    """Echo World Hello"""
    c.run("echo World Hello")
