"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const path = require("path");
exports.invoke = async (targetDirectory) => {
    const slnPath = path.join(targetDirectory, "src", "CdkWorkshop.sln");
    const csprojPath = path.join(targetDirectory, "src", "CdkWorkshop", "CdkWorkshop.csproj");
    const child = child_process.spawn('dotnet', ['sln', slnPath, 'add', csprojPath], {
        // Need this for Windows where we want .cmd and .bat to be found as well.
        shell: true,
        stdio: ['ignore', 'pipe', 'inherit']
    });
    await new Promise((resolve, reject) => {
        const stdout = new Array();
        child.stdout.on('data', chunk => {
            process.stdout.write(chunk);
            stdout.push(chunk);
        });
        child.once('error', reject);
        child.once('exit', code => {
            if (code === 0) {
                resolve(Buffer.concat(stdout).toString('utf-8'));
            }
            else {
                reject(new Error(`Could not add project CdkWorkshop.csproj to solution CdkWorkshop.sln. Error code: ${code}`));
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb2plY3QuaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC1wcm9qZWN0Lmhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBK0M7QUFDL0MsNkJBQTZCO0FBR2hCLFFBQUEsTUFBTSxHQUFlLEtBQUssRUFBRSxlQUF1QixFQUFFLEVBQUU7SUFDbEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDNUUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLDJCQUEyQixDQUFDLENBQUM7SUFFeEcsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUUsRUFBRTtRQUNqRix5RUFBeUU7UUFDekUsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsQ0FBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBRTtLQUN2QyxDQUFDLENBQUM7SUFFSCxNQUFNLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFFaEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN4QixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG1HQUFtRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDOUg7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBJbnZva2VIb29rIH0gZnJvbSAnLi4vLi4vLi4vaW5pdCc7XG5cbmV4cG9ydCBjb25zdCBpbnZva2U6IEludm9rZUhvb2sgPSBhc3luYyAodGFyZ2V0RGlyZWN0b3J5OiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgc2xuUGF0aCA9IHBhdGguam9pbih0YXJnZXREaXJlY3RvcnksIFwic3JjXCIsIFwiJW5hbWUuUGFzY2FsQ2FzZWQlLnNsblwiKTtcbiAgY29uc3QgY3Nwcm9qUGF0aCA9IHBhdGguam9pbih0YXJnZXREaXJlY3RvcnksIFwic3JjXCIsIFwiJW5hbWUuUGFzY2FsQ2FzZWQlXCIsIFwiJW5hbWUuUGFzY2FsQ2FzZWQlLmNzcHJvalwiKTtcblxuICBjb25zdCBjaGlsZCA9IGNoaWxkX3Byb2Nlc3Muc3Bhd24oJ2RvdG5ldCcsIFsgJ3NsbicsIHNsblBhdGgsICdhZGQnLCBjc3Byb2pQYXRoIF0sIHtcbiAgICAvLyBOZWVkIHRoaXMgZm9yIFdpbmRvd3Mgd2hlcmUgd2Ugd2FudCAuY21kIGFuZCAuYmF0IHRvIGJlIGZvdW5kIGFzIHdlbGwuXG4gICAgc2hlbGw6IHRydWUsXG4gICAgc3RkaW86IFsgJ2lnbm9yZScsICdwaXBlJywgJ2luaGVyaXQnIF1cbiAgfSk7XG5cbiAgYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc3Rkb3V0ID0gbmV3IEFycmF5PGFueT4oKTtcblxuICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIGNodW5rID0+IHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNodW5rKTtcbiAgICAgIHN0ZG91dC5wdXNoKGNodW5rKTtcbiAgICB9KTtcblxuICAgIGNoaWxkLm9uY2UoJ2Vycm9yJywgcmVqZWN0KTtcblxuICAgIGNoaWxkLm9uY2UoJ2V4aXQnLCBjb2RlID0+IHtcbiAgICAgIGlmIChjb2RlID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoQnVmZmVyLmNvbmNhdChzdGRvdXQpLnRvU3RyaW5nKCd1dGYtOCcpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYENvdWxkIG5vdCBhZGQgcHJvamVjdCAlbmFtZS5QYXNjYWxDYXNlZCUuY3Nwcm9qIHRvIHNvbHV0aW9uICVuYW1lLlBhc2NhbENhc2VkJS5zbG4uIEVycm9yIGNvZGU6ICR7Y29kZX1gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==