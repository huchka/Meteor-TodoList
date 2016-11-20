import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { chai } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
	describe('Tasks', () => {
		describe('methods', () => {
			const userId = Random.id();
			let taskId;

			beforeEach(() => {
				Tasks.remove({});
				taskId = Tasks.insert({
					text: 'test task',
					createAt: new Date(),
					owner: userId,
					username: 'tmeasday',
				});
			});

			it('can delete owned task', () => {
				const deleteTask = Meteor.server.method_handlers['tasks.remove'];

				const invocation = { userId };

				console.log(Tasks.find().fetch());

				deleteTask.apply(invocation, [taskId]);

				console.log(Tasks.find().count());
				console.log(Tasks.find().fetch());

				chai.assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}