<div class="content">
    <span class="name">{widget.name}</span>
    <span class="package">{widget.package}</span>
    <span class="descriptionLabel">Description</span>
    <div class="description">
        {widget.description}
    </div>
    <div class="details">
        <div>
            <span class="rowHead">Version:</span><span class="smallDetail">{widget.version}</span>
        </div>
        <div>
            <span class="rowHead">Date:</span><span class="smallDetail">{widget.date}</span>
        </div>
    </div>
</div>

<script lang="ts">
    import type { WidgetManifest } from '../Widget';
    export let widget:WidgetManifest = {
        name: '',
        package: '',
        description: '',
        version: '',
        date: '',
        author: '',
    };
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        width: 250px;
        margin-top: 15px;
        margin-left: 10px;
    }
    .name {
        font-size: 1.5em;
        font-weight: bold;
    }
    .package {
        font-size: 1em;
    }
    .descriptionLabel {
        margin-top: 15px;
        font-weight: bold;
    }
    .description {
        font-size: 0.8em;
        line-height: 1em;
        height: 100px;
    }
    .details {
        padding-top: 10px
    }
    .smallDetail {
        font-size: 1em;
    }
    .rowHead {
        font-size: 1em;
        font-weight: bold;
    }
</style>