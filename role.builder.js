var roleBuilder = {
    /**
    * 建造creeper
    * 
    * /

    /** @param {Creep} creep **/
    run: function(creep) {

        // creeper 自身能量为0 转换为采集模式 
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    
	    // creeper 达到最大采集量 转换为建造模式
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

        // 建造模式下
	    if(creep.memory.building) {
	        // 寻找建造点
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        // 存在待建造
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // TODO 不存在待建造点
	    }
	    else {
	        // 采集模式下
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;