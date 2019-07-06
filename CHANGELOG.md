# Change Log
All notable changes to the "vsc-invoke" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.1] - 2018.01.10
### Added
- Initial release

## [0.0.2] - 2018.01.13
### Added
- Documentation improvements

## [0.0.3] - 2018.01.13
### Added
- Documentation improvements

## [0.0.4] - 2018.01.22
### Added
- Documentation improvements

## [0.0.5] - 2018.04.14
### Added
- Better logic to find `tasks.py` definition files in case more than 1 directory are in the Workspace

## [0.0.6] - 2018.06.29
### Added
- Introduced used setting `vsc-invoke.invoke.path` to define path to `invoke` command if it's not available in your path.

## [0.0.7] - 2018.07.02
### Changed
- Renamed `vsc-invoke.invoke.path` to `vsc-invoke.invoke.cmd` to point to local `invoke` command
### Fixed
- Fixed warning about missing extension configuration
- Allow ESC during invocation of the command via the palette

## [0.0.8] - 2018.07.21
### Changed
- Now requires `invoke` version 1.x or better (technically 0.23.0 or better will work) to leverage the new JSON output format for tasks list

## [0.0.9] - 2018.07.22
### Fixed
- Fixed tasks list parsing when JSON contains collections. Currently only supports 1 level deep.

## [0.0.10] - 2019.05.02
### Added
- Support for tasks package/collection

## [0.0.11] - 2019.05.06
### Fix
- Fixed how we handle path to support Windows

## [0.0.12] - 2019.07.05
### Fix
- Fix support for collections