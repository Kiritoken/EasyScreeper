var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    // 防止内存泄漏
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // 采集creeper 生成策略
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['home'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    // 建造creeper 生成策略
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        Game.spawns['home'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
    // 升级creeper 生成策略
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['home'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    
    if(Game.spawns['home'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['home'].spawning.name];
        Game.spawns['home'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['home'].pos.x + 1, 
            Game.spawns['home'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    

    // creeper action策略
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        // 采集creeper
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        
        // 升级creeper
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        // 建造creeper
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}