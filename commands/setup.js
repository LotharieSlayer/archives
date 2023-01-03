const { setupArchives } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
        subcommand
            .setName("archives")
            .setDescription(
                "Définir/Supprimer le rôle pour les membres autorisés à accéder aux archives."
            )
            .addRoleOption((role) =>
                role
                    .setName("archives")
                    .setDescription(
                        "Le rôle pour les membres autorisés à accéder aux archives."
                    )
            )
    )
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        
        case "archives":
            // eslint-disable-next-line no-case-declarations
            const archivesGet = await setupArchives.get(interaction.guild.id);
            if (archivesGet === undefined) {
                const roleId = interaction.options.getRole("archives").id;
                if (roleId != undefined) {
                    setupArchives.set(
                        interaction.guild.id,
                        interaction.options.getRole("archives").id
                    );
                    await interaction.reply({
                        content: `Rôle des archives ajouté au serveur ! (<@!${
                            interaction.options.getRole("archives").id
                        }>)`,
                        ephemeral: true,
                    });
                } else {
                    await interaction.reply({
                        content: `Rôle à supprimer introuvable, vous devez spécifier un rôle si vous souhaitez l'ajouter.`,
                        ephemeral: true,
                    });
                }
            } else {
                setupArchives.delete(interaction.guild.id);
                await interaction.reply({
                    content: `Rôle des archives supprimé du serveur ! (<@!${archivesGet}>)`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
