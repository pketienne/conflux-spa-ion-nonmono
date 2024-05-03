/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			home: 'aws',
			name: 'conflux-spa-ion',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
		};
	},
	async run() {
		const bucket = new sst.aws.Bucket('MyBucket', {
			public: true,
		});
		const table = new sst.aws.Dynamo('MyTable', {
			fields: {
				userId: 'string',
				noteId: 'string',
			},
			primaryIndex: { hashKey: 'userId', rangeKey: 'noteId' },
		});
		new sst.aws.Nextjs('MyWeb', {
			link: [bucket, table],
		});
	},
});
