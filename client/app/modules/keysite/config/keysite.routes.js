(function() {
    'use strict';
    angular
        .module('com.module.keysite')
        .config(function($stateProvider) {
            $stateProvider.state('app.keysite', {
                abstract: true,
                url: '/keysite',
                templateUrl: 'modules/keysite/views/main.html',
                controller: 'KeysiteCtrl'
            })

            //基站
            .state('app.keysite.baseStation', {
                abstract: true,
                url: '/baseStation',
                templateUrl: 'modules/keysite/views/baseStation/main.html'
            })

            .state('app.keysite.baseStation.map', {
                url: '/map',
                templateUrl: 'modules/keysite/views/baseStation/map.html',
                controller: 'MapCtrl',
            })

            .state('app.keysite.baseStation.index', {
                url: '',
                templateUrl: 'modules/keysite/views/baseStation/list.html',
                controller: 'BaseStationCtrl',
            })

            .state('app.keysite.baseStation.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/baseStation/form.html',
                controllerAs: 'ctrl',
                controller: function($state, BaseStationService, baseStation) {
                    this.baseStation = baseStation;
                    this.formFields = BaseStationService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        BaseStationService.upsert(this.baseStation).then(function() {
                            $state.go('^.index');
                        });
                    };
                },
                resolve: {
                    baseStation: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.baseStation.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/baseStation/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, BaseStationService, baseStation) {
                        this.baseStation = baseStation;
                        this.formFields = BaseStationService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            BaseStationService.upsert(this.baseStation).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        baseStation: function($stateParams, BaseStationService) {
                            return BaseStationService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.baseStation.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/baseStation/view.html',
                    controllerAs: 'ctrl',
                    controller: function(baseStation) {
                        this.baseStation = baseStation;
                    },
                    resolve: {
                        baseStation: function($stateParams, BaseStationService) {
                            return BaseStationService.findById($stateParams.id);
                        }
                    }
                })
                //////////
                //桥梁
                .state('app.keysite.bridge', {
                    abstract: true,
                    url: '/bridge',
                    templateUrl: 'modules/keysite/views/bridge/main.html',
                    controller: 'BridgeCtrl',
                })

            .state('app.keysite.bridge.index', {
                    url: '',
                    templateUrl: 'modules/keysite/views/bridge/list.html',
                    controller: 'BridgeCtrl',
                })
                .state('app.keysite.bridge.map', {
                    url: '/map',
                    templateUrl: 'modules/keysite/views/bridge/map.html',
                    controller: 'MapCtrl',
                })
                .state('app.keysite.bridge.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/bridge/list.html',
                    controller: 'BridgeCtrl',
                })

            .state('app.keysite.bridge.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/bridge/form.html',
                controllerAs: 'ctrl',
                controller: function($state, BridgeService, bridge) {
                    this.bridge = bridge;
                    this.formFields = BridgeService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        BridgeService.upsert(this.bridge).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    bridge: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.bridge.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/bridge/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, BridgeService, bridge) {
                        this.bridge = bridge;
                        this.formFields = BridgeService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            BridgeService.upsert(this.bridge).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        bridge: function($stateParams, BridgeService) {
                            return BridgeService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.bridge.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/bridge/view.html',
                    controllerAs: 'ctrl',
                    controller: function(bridge) {
                        this.bridge = bridge;
                    },
                    resolve: {
                        bridge: function($stateParams, BridgeService) {
                            return BridgeService.findById($stateParams.id);
                        }
                    }
                })


            /////////
            //横跨铁锹
            .state('app.keysite.crossIronBridge', {
                abstract: true,
                url: '/crossIronBridge',
                templateUrl: 'modules/keysite/views/crossIronBridge/main.html',
                controller: 'CrossIronBridgeCtrl'
            })

            .state('app.keysite.crossIronBridge.index', {
                    url: '',
                    templateUrl: 'modules/keysite/views/crossIronBridge/list.html',
                    controller: 'CrossIronBridgeCtrl',
                })
                .state('app.keysite.crossIronBridge.map', {
                    url: '/map',
                    templateUrl: 'modules/keysite/views/crossIronBridge/map.html',
                    controller: 'CrossIronBridgeMapCtrl',
                })
                .state('app.keysite.crossIronBridge.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/crossIronBridge/list.html',
                    controller: 'CrossIronBridgeCtrl',
                })

            .state('app.keysite.crossIronBridge.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/crossIronBridge/form.html',
                controllerAs: 'ctrl',
                controller: function($state, CrossIronBridgeService, crossIronBridge) {
                    this.crossIronBridge = crossIronBridge;
                    this.formFields = CrossIronBridgeService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        CrossIronBridgeService.upsert(this.crossIronBridge).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    crossIronBridge: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.crossIronBridge.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/crossIronBridge/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, CrossIronBridgeService, crossIronBridge) {
                        this.crossIronBridge = crossIronBridge;
                        this.formFields = CrossIronBridgeService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            CrossIronBridgeService.upsert(this.crossIronBridge).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        crossIronBridge: function($stateParams, CrossIronBridgeService) {
                            return CrossIronBridgeService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.crossIronBridge.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/crossIronBridge/view.html',
                    controllerAs: 'ctrl',
                    controller: function(crossIronBridge) {
                        this.crossIronBridge = crossIronBridge;
                    },
                    resolve: {
                        crossIronBridge: function($stateParams, CrossIronBridgeService) {
                            return CrossIronBridgeService.findById($stateParams.id);
                        }
                    }
                })

            //////////
            //涵洞
            .state('app.keysite.culvert', {
                abstract: true,
                url: '/culvert',
                templateUrl: 'modules/keysite/views/culvert/main.html',
                controller: 'CulvertCtrl',

            })

            .state('app.keysite.culvert.index', {
                    url: '',
                    templateUrl: 'modules/keysite/views/culvert/list.html',
                    controller: 'CulvertCtrl',
                })
                .state('app.keysite.culvert.map', {
                    url: '/map',
                    templateUrl: 'modules/keysite/views/culvert/map.html',
                    controller: 'CulvertMapCtrl',
                })
                .state('app.keysite.culvert.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/culvert/list.html',
                    controller: 'CulvertCtrl',
                })

            .state('app.keysite.culvert.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/culvert/form.html',
                controllerAs: 'ctrl',
                controller: function($state, CulvertService, culvert) {
                    this.culvert = culvert;
                    this.formFields = CulvertService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        CulvertService.upsert(this.culvert).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    culvert: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.culvert.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/culvert/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, CulvertService, culvert) {
                        this.culvert = culvert;
                        this.formFields = CulvertService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            CulvertService.upsert(this.culvert).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        culvert: function($stateParams, CulvertService) {
                            return CulvertService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.culvert.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/culvert/view.html',
                    controllerAs: 'ctrl',
                    controller: function(culvert) {
                        this.culvert = culvert;
                    },
                    resolve: {
                        culvert: function($stateParams, CulvertService) {
                            return CulvertService.findById($stateParams.id);
                        }
                    }
                })


            /////////
            //道口
            .state('app.keysite.levelCrossing', {
                abstract: true,
                url: '/levelCrossing',
                templateUrl: 'modules/keysite/views/levelCrossing/main.html',
                controller: 'LevelCrossingCtrl',
            })

            .state('app.keysite.levelCrossing.index', {
                url: '',
                templateUrl: 'modules/keysite/views/levelCrossing/list.html',
                controller: 'LevelCrossingCtrl',
            })

            .state('app.keysite.levelCrossing.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/levelCrossing/list.html',
                    controller: 'LevelCrossingCtrl',
                })
                .state('app.keysite.levelCrossing.map', {
                    url: '',
                    templateUrl: 'modules/keysite/views/levelCrossing/map.html',
                    controller: 'LevelCrossingMapCtrl',
                })

            .state('app.keysite.levelCrossing.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/levelCrossing/form.html',
                controllerAs: 'ctrl',
                controller: function($state, LevelCrossingService, levelCrossing) {
                    this.levelCrossing = levelCrossing;
                    this.formFields = LevelCrossingService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        LevelCrossingService.upsert(this.levelCrossing).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    levelCrossing: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.levelCrossing.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/levelCrossing/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, LevelCrossingService, levelCrossing) {
                        this.levelCrossing = levelCrossing;
                        this.formFields = LevelCrossingService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            LevelCrossingService.upsert(this.levelCrossing).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        levelCrossing: function($stateParams, LevelCrossingService) {
                            return LevelCrossingService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.levelCrossing.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/levelCrossing/view.html',
                    controllerAs: 'ctrl',
                    controller: function(levelCrossing) {
                        this.levelCrossing = levelCrossing;
                    },
                    resolve: {
                        levelCrossing: function($stateParams, LevelCrossingService) {
                            return LevelCrossingService.findById($stateParams.id);
                        }
                    }
                })



            /////////
            //检修口
            .state('app.keysite.servicePort', {
                abstract: true,
                url: '/servicePort',
                templateUrl: 'modules/keysite/views/servicePort/main.html',
                controller: 'ServicePortCtrl',

            })

            .state('app.keysite.servicePort.index', {
                    url: '',
                    templateUrl: 'modules/keysite/views/servicePort/list.html',
                    controller: 'ServicePortCtrl',
                })
                .state('app.keysite.servicePort.map', {
                    url: '/map',
                    templateUrl: 'modules/keysite/views/servicePort/map.html',
                    controller: 'ServiceportMapCtrl',
                })
                .state('app.keysite.servicePort.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/servicePort/list.html',
                    controller: 'ServicePortCtrl',
                })

            .state('app.keysite.servicePort.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/servicePort/form.html',
                controllerAs: 'ctrl',
                controller: function($state, ServicePortService, servicePort) {
                    this.servicePort = servicePort;
                    this.formFields = ServicePortService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        ServicePortService.upsert(this.servicePort).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    servicePort: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.servicePort.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/servicePort/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, ServicePortService, servicePort) {
                        this.servicePort = servicePort;
                        this.formFields = ServicePortService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            ServicePortService.upsert(this.servicePort).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        servicePort: function($stateParams, ServicePortService) {
                            return ServicePortService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.servicePort.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/servicePort/view.html',
                    controllerAs: 'ctrl',
                    controller: function(servicePort) {
                        this.servicePort = servicePort;
                    },
                    resolve: {
                        servicePort: function($stateParams, ServicePortService) {
                            return ServicePortService.findById($stateParams.id);
                        }
                    }
                })

            //////////
            //车站
            .state('app.keysite.station', {
                abstract: true,
                url: '/station',
                templateUrl: 'modules/keysite/views/station/main.html',
                controller: 'StationCtrl',

            })

            .state('app.keysite.station.index', {
                url: '',
                templateUrl: 'modules/keysite/views/station/list.html',
                controller: 'StationCtrl',
            })

            .state('app.keysite.station.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/station/list.html',
                    controller: 'StationCtrl',
                })
                .state('app.keysite.station.map', {
                    url: '',
                    templateUrl: 'modules/keysite/views/station/map.html',
                    controller: 'StationMapCtrl',
                })

            .state('app.keysite.station.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/station/form.html',
                controllerAs: 'ctrl',
                controller: function($state, StationService, station) {
                    this.station = station;
                    this.formFields = StationService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        StationService.upsert(this.station).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    station: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.station.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/station/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, StationService, station) {
                        this.station = station;
                        this.formFields = StationService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            StationService.upsert(this.station).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        station: function($stateParams, StationService) {
                            return StationService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.station.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/station/view.html',
                    controllerAs: 'ctrl',
                    controller: function(station) {
                        this.station = station;
                    },
                    resolve: {
                        station: function($stateParams, StationService) {
                            return StationService.findById($stateParams.id);
                        }
                    }
                })

            //////////
            //隧道
            .state('app.keysite.tunnel', {
                abstract: true,
                url: '/tunnel',
                templateUrl: 'modules/keysite/views/tunnel/main.html',
                controller: 'TunnelCtrl',

            })

            .state('app.keysite.tunnel.index', {
                url: '',
                templateUrl: 'modules/keysite/views/tunnel/list.html',
                controller: 'TunnelCtrl',
            })

            .state('app.keysite.tunnel.list', {
                    url: '',
                    templateUrl: 'modules/keysite/views/tunnel/list.html',
                    controller: 'TunnelCtrl',
                })
                .state('app.keysite.tunnel.map', {
                    url: '',
                    templateUrl: 'modules/keysite/views/tunnel/map.html',
                    controller: 'TunnelMapCtrl',
                })

            .state('app.keysite.tunnel.add', {
                url: '/add',
                templateUrl: 'modules/keysite/views/tunnel/form.html',
                controllerAs: 'ctrl',
                controller: function($state, TunnelService, tunnel) {
                    this.tunnel = tunnel;
                    this.formFields = TunnelService.getFormFields();
                    this.formOptions = {};
                    this.submit = function() {
                        TunnelService.upsert(this.tunnel).then(function() {
                            $state.go('^.list');
                        });
                    };
                },
                resolve: {
                    tunnel: function() {
                        return {};
                    }
                }
            })

            .state('app.keysite.tunnel.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/keysite/views/tunnel/form.html',
                    controllerAs: 'ctrl',
                    controller: function($state, TunnelService, tunnel) {
                        this.tunnel = tunnel;
                        this.formFields = TunnelService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            TunnelService.upsert(this.tunnel).then(function() {
                                $state.go('^.index');
                            });
                        };
                    },
                    resolve: {
                        tunnel: function($stateParams, TunnelService) {
                            return TunnelService.findById($stateParams.id);
                        }
                    }
                })
                .state('app.keysite.tunnel.view', {
                    url: '/:id',
                    templateUrl: 'modules/keysite/views/tunnel/view.html',
                    controllerAs: 'ctrl',
                    controller: function(tunnel) {
                        this.tunnel = tunnel;
                    },
                    resolve: {
                        tunnel: function($stateParams, TunnelService) {
                            return TunnelService.findById($stateParams.id);
                        }
                    }
                });
        });
})();