import axios from "axios";

const retrieveCharacterList = () => {
	return new Promise((resolve, reject) => {
        axios
        .get("http://192.168.1.104:4000/characters/")
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const saveCharacter = (id, characterObj) => {
	return new Promise((resolve, reject) => {
        axios
        .put("http://192.168.1.104:4000/characters/update-character/" + id,
            characterObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const createCharacter = (characterObj) => {
	return new Promise((resolve, reject) => {
        axios
        .post("http://192.168.1.104:4000/characters/create-character",
            characterObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const deleteCharacter = (id) => {
	return new Promise((resolve, reject) => {
        axios
        .delete("http://192.168.1.104:4000/characters/delete-character/" + id)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const retrieveEnemyList = () => {
	return new Promise((resolve, reject) => {
        axios
        .get("http://192.168.1.104:4000/enemies/")
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const saveEnemy = (id, enemyObj) => {
	return new Promise((resolve, reject) => {
        axios
        .put("http://192.168.1.104:4000/enemies/update-enemy/" + id,
            enemyObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const createEnemy = (enemyObj) => {
	return new Promise((resolve, reject) => {
        axios
        .post("http://192.168.1.104:4000/enemies/create-enemy",
            enemyObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const deleteEnemy = (id) => {
	return new Promise((resolve, reject) => {
        axios
        .delete("http://192.168.1.104:4000/enemies/delete-enemy/" + id)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

/*
 NPC endpoints
*/
const retrieveNPCList = () => {
	return new Promise((resolve, reject) => {
        axios
        .get("http://192.168.1.104:4000/npcs/")
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const saveNPC = (id, enemyObj) => {
	return new Promise((resolve, reject) => {
        axios
        .put("http://192.168.1.104:4000/npcs/update-npc/" + id,
            enemyObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const createNPC = (enemyObj) => {
	return new Promise((resolve, reject) => {
        axios
        .post("http://192.168.1.104:4000/npcs/create-npc",
            enemyObj)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

const deleteNPC = (id) => {
	return new Promise((resolve, reject) => {
        axios
        .delete("http://192.168.1.104:4000/npc/delete-npc/" + id)
        .then(({ data }) => {
            resolve(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            reject();
        });
    });
};

export {retrieveCharacterList, saveCharacter, createCharacter, deleteCharacter, retrieveEnemyList, saveEnemy, createEnemy, deleteEnemy, retrieveNPCList, saveNPC, createNPC, deleteNPC};
