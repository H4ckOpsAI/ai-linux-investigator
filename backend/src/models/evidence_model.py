class Evidence:

    def __init__(
        self,
        processes,
        network_activity,
        users,
        cron_jobs,
        login_activity
    ):
        self.processes = processes
        self.network_activity = network_activity
        self.users = users
        self.cron_jobs = cron_jobs
        self.login_activity = login_activity
