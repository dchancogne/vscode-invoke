"""Module for tying together Invoke tasks subsmodules"""
from invoke import Collection

from tasks import hello, world

ns = Collection()
ns.add_collection(Collection.from_module(hello))
ns.add_collection(Collection.from_module(world))
