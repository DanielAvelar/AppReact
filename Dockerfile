FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["app-sage/app-sage.csproj", "app-sage/"]
COPY ["BusinessLibrary/BusinessLibrary.csproj", "BusinessLibrary/"]
COPY ["DataAccessLibrary/DataAccessLibrary.csproj", "DataAccessLibrary/"]
RUN dotnet restore "app-sage/app-sage.csproj"
COPY . .
WORKDIR "/src/app-sage"
RUN dotnet build "app-sage.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "app-sage.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "app-sage.dll"]