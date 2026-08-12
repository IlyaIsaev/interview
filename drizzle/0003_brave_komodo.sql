CREATE TABLE `demo_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `demo_profiles_expiresAt_idx` ON `demo_profiles` (`expires_at`);--> statement-breakpoint
DROP TABLE `demo_questions`;--> statement-breakpoint
CREATE TABLE `demo_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`demo_profile_id` text NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`demo_profile_id`) REFERENCES `demo_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `demo_questions_demoProfileId_idx` ON `demo_questions` (`demo_profile_id`);
