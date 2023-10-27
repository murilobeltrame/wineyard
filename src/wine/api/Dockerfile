FROM mcr.microsoft.com/dotnet/sdk:7.0 AS builder
WORKDIR /source

COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

COPY --from=builder /app ./

ENTRYPOINT [ "dotnet", "Wine.Api.dll" ]