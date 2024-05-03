import 'sst';
declare module 'sst' {
	export interface Resource {
		MyBucket: {
			name: string;
			type: 'sst.aws.Bucket';
		};
		MyTable: {
			name: string;
			type: 'sst.aws.Dynamo';
		};
	}
}
export {};
